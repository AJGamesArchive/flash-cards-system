import Timer from "../../src/classes/Timer";

describe('Timer', () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });

  test('should set endTime when stop is called after start', () => {
    timer.start();
    timer.stop();
    expect(timer['endTime']).not.toBeNull();
  });

  test('should not set endTime when stop is called without start', () => {
    timer.stop();
    expect(timer['endTime']).toBeNull();
  });

  test('should return the correct duration', () => {
    timer.start();
    setTimeout(() => {
      timer.stop();
      const duration = timer.getDuration();
      expect(duration).toBeGreaterThan(0);
    }, 100);
  });
  
  test('should return 0 duration if stop is not called', () => {
    timer.start();
    const duration = timer.getDuration();
    expect(duration).toBe(0);
  });
  
  test('should reset the timer', () => {
    timer.start();
    timer.stop();
    timer.reset();
    expect(timer['startTime']).toBeNull();
    expect(timer['endTime']).toBeNull();
  });
});
