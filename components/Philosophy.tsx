'use client';

import { motion } from 'framer-motion';
import styles from './Philosophy.module.scss';
import FadeIn from './animations/FadeIn';

const PHILOSOPHY_DATA = [
  {
    keyword: 'User',
    title: '사용자를 위한 집요함',
    description:
      '기술은 결국 사용자를 위해 존재합니다. 0.1초의 로딩 시간 단축, 1px의 어긋남 없는 UI, 직관적인 인터랙션을 위해 집요하게 고민합니다. 사용자가 느끼는 경험의 깊이가 곧 서비스의 가치라고 믿습니다.',
  },
  {
    keyword: 'Code',
    title: '지속 가능한 코드',
    description:
      '코드는 작성하는 시간보다 읽히는 시간이 훨씬 깁니다. 당장의 구현보다 미래의 유지보수성을 고려하며, 동료가 쉽게 이해하고 확장할 수 있는 명확하고 견고한 코드를 지향합니다.',
  },
  {
    keyword: 'Team',
    title: '함께 만드는 가치',
    description:
      '최고의 제품은 뛰어난 개인보다 훌륭한 팀에서 나옵니다. 적극적인 소통과 지식 공유를 통해 팀의 성장을 도모하며, 기획자, 디자이너와 함께 최선의 해결책을 찾아가는 과정을 즐깁니다.',
  },
];

export default function Philosophy() {
  return (
    <section className={styles.section} id="philosophy">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {PHILOSOPHY_DATA.map((item, index) => (
            <div key={index}>
              <FadeIn direction="up" delay={0.2} className={styles.item}>
                <div className={styles.titleWrapper}>
                  <span className={styles.enKeyword}>{item.keyword}.</span>
                  <h3 className={styles.krTitle}>{item.title}</h3>
                </div>
                <p className={styles.description}>{item.description}</p>
              </FadeIn>
              {index < PHILOSOPHY_DATA.length - 1 && (
                <FadeIn delay={0.3} className={styles.dividerWrapper}>
                  <div className={styles.divider} />
                </FadeIn>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
