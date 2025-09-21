export const AiRecommendationSurvey = {
  steps: [
    {
      id: 'question1',
      type: 'checkbox' as const,
      question: '환경 활동 중에서\n관심 있는 분야는 무엇인가요?',
      options: [
        { id: 1, text: '물과 전기절약 실천 (생활용품 절약·전, 친환경 등)' },
        { id: 2, text: '기후 변화 대응 (에너지 절약, 탄소 줄이기 등)' },
        { id: 3, text: '자연 생태 보전 (산책, 정화, 동물 보호 등)' },
        { id: 4, text: '지역사회 활동 (봉사, 환경 캠페인 참여 등)' },
      ],
    },
    {
      id: 'question2',
      type: 'radio' as const,
      question:
        '주말이나 여가 시간에 야외 활동을 얼마나\n 자주하시나요?\n(산책, 운동, 봉사활동 등)',
      options: [
        { id: 1, text: '거의 밖에 나가지 않는다' },
        { id: 2, text: '가끔 한다 (월 2~3회)' },
        { id: 3, text: '자주 한다 (주 2~3회)' },
        { id: 4, text: '매우 자주 한다 (주 4회 이상)' },
      ],
    },
    {
      id: 'question3',
      type: 'radio' as const,
      question:
        '평소에 에너지 절약을 위해\n 얼마나 신경을 쓰시나요?\n(불 끄기, 전기제품 절전모드, 물 아끼기 등)',
      options: [
        { id: 1, text: '거의 신경쓰지 않는다' },
        { id: 2, text: '가끔 신경 쓴다' },
        { id: 3, text: '자주 신경 쓴다' },
        { id: 4, text: '습관처럼 항상 실천한다' },
      ],
    },
    {
      id: 'question4',
      type: 'scale' as const,
      question: '본인이 생각하는 환경 활동 실천력은\n몇 점(1~10점)인가요?',
      scaleConfig: {
        min: 1,
        max: 10,
        step: 1,
      },
    },
  ],
}
