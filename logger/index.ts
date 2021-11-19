import pino from 'pino';

const logger = pino({
  browser: {
    asObject: true,
    transmit: {
      level: 'warn',
      send: (level, logEvent) => {
        const {
          level: { value },
        } = logEvent;
        if (value >= 50) {
          // TODO: warn 이상의 로그가 발생한 경우 Sentry 같은 외부 서비스, 혹은 자체 구현한 로그서버로 전송
          console.log(
            '%c TODO: 오류를 서버로 옮긴다',
            'background: #222; color: #bada55'
          );
        }
      },
    },
  },
});

export default logger;
