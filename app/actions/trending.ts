'use server';

export interface TrendingKeyword {
  rank: number;
  keyword: string;
  url: string;
  status: string;
}

export interface TrendingData {
  keywords: TrendingKeyword[];
  updatedAt: string;
}

/**
 * 다음 실시간 트렌드 키워드를 크롤링합니다.
 * 10분 주기로 자동 갱신됩니다.
 */
export async function fetchDaumTrending(): Promise<TrendingData> {
  try {
    const response = await fetch('https://www.daum.net', {
      next: { revalidate: 600 },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    // tillerInitData JSON 추출 (bracket matching)
    const startMarker = 'window.tillerInitData=';
    const startIdx = html.indexOf(startMarker);
    if (startIdx === -1) throw new Error('tillerInitData not found');

    const jsonStart = startIdx + startMarker.length;
    let depth = 0;
    let jsonEnd = -1;

    for (let i = jsonStart; i < html.length; i++) {
      if (html[i] === '{') depth++;
      else if (html[i] === '}') {
        depth--;
        if (depth === 0) {
          jsonEnd = i + 1;
          break;
        }
      }
    }

    if (jsonEnd === -1) throw new Error('JSON bracket matching failed');

    const tillerData = JSON.parse(html.substring(jsonStart, jsonEnd));
    return extractTrendFromTiller(tillerData);
  } catch (error) {
    console.error('다음 실시간 트렌드 크롤링 실패:', error);
    return { keywords: [], updatedAt: new Date().toISOString() };
  }
}

interface RawKeyword {
  keyword: string;
  rank: number;
  displayRank: number;
  status?: string;
}

interface TillerNode {
  uiType?: string;
  children?: TillerNode[];
  contents?: {
    data?: {
      updatedAt?: string;
      keywords?: RawKeyword[];
    };
  };
}

/**
 * tillerInitData에서 REALTIME_TREND_TOP 슬롯을 재귀 탐색하여
 * 실시간 트렌드 키워드를 추출합니다.
 */
function extractTrendFromTiller(data: {
  frames?: TillerNode[];
}): TrendingData {
  const emptyResult: TrendingData = {
    keywords: [],
    updatedAt: new Date().toISOString(),
  };

  if (!data.frames) return emptyResult;

  // 재귀 탐색으로 REALTIME_TREND_TOP 슬롯 찾기
  function findTrendNode(node: TillerNode): TillerNode | null {
    if (node.uiType === 'REALTIME_TREND_TOP') {
      return node;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const found = findTrendNode(node.children[i]);
        if (found) return found;
      }
    }
    return null;
  }

  let trendNode: TillerNode | null = null;
  for (let i = 0; i < data.frames.length; i++) {
    trendNode = findTrendNode(data.frames[i]);
    if (trendNode) break;
  }

  if (!trendNode?.contents?.data?.keywords) return emptyResult;

  const rawKeywords = trendNode.contents.data.keywords;
  const updatedAt =
    trendNode.contents.data.updatedAt || new Date().toISOString();

  // displayRank 기준 정렬 후 상위 10개 추출
  const sorted = [...rawKeywords].sort(
    (a, b) => a.displayRank - b.displayRank
  );

  const keywords: TrendingKeyword[] = sorted.slice(0, 10).map((item) => ({
    rank: item.displayRank,
    keyword: item.keyword,
    url: `https://search.daum.net/search?q=${encodeURIComponent(item.keyword)}&t__nil_top=trend&nil_mtop=trend`,
    status: item.status || '0',
  }));

  return { keywords, updatedAt };
}
