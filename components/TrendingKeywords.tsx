import { fetchDaumTrending } from '@/app/actions/trending';
import TrendingTicker from './TrendingTicker';

/**
 * 다음 실시간 트렌드 - 서버 컴포넌트 (데이터 fetch만 담당).
 * 10분마다 자동 갱신되며, SEO 친화적인 서버 렌더링을 수행합니다.
 */
export default async function TrendingKeywords() {
  const data = await fetchDaumTrending();

  return <TrendingTicker keywords={data.keywords} updatedAt={data.updatedAt} />;
}
