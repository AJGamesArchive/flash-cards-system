import FlashcardUsageTimer from "../../src/classes/FlashcardUsageTimer";
// import FlashcardUsageLog from "../../src/types/global/FlashcardUsageLog";
// import { SetStateAction } from 'react';
import { jest, expect } from '@jest/globals';

describe('FlashcardUsageTimer', () => {
  let timer: FlashcardUsageTimer;
  let setLogs: jest.Mock;

  beforeEach(() => {
    timer = new FlashcardUsageTimer();
    setLogs = jest.fn();
  });

  test('should start and reset the log correctly', () => {
    timer.startLog();
    expect(timer['revisionTime']).toBe(0);
    expect(timer['faceDownTime']).toBe(0);
    expect(timer['timesFlipped']).toBe(0);
    expect(timer['revisionTimer']['startTime']).not.toBeNull();
    expect(timer['faceDownTimer']['startTime']).not.toBeNull();
  });

  test('should log a flip correctly', () => {
    timer.startLog();
    timer.logFlip(false);
    expect(timer['faceDownTimer']['startTime']).toBeNull();
    expect(timer['timesFlipped']).toBe(1);
    timer.logFlip(true);
    expect(timer['faceDownTimer']['startTime']).not.toBeNull();
  });

  test('should reset timers after saving the log', () => {
    timer.startLog();
    timer.logFlip(false);
    timer.saveLog('test-uuid', setLogs);
    expect(timer['revisionTime']).toBe(0);
    expect(timer['faceDownTime']).toBe(0);
    expect(timer['timesFlipped']).toBe(0);
    expect(timer['revisionTimer']['startTime']).not.toBeNull();
    expect(timer['faceDownTimer']['startTime']).not.toBeNull();
  });

  test('should stop and restart timers when saveLog is called', () => {
    timer.startLog();
    timer.logFlip(false);
    timer.saveLog('test-uuid', setLogs);
    expect(timer['faceDownTimer']['startTime']).not.toBeNull();
    expect(timer['revisionTimer']['startTime']).not.toBeNull();
    expect(timer['faceDownTimer']['endTime']).toBeNull();
    expect(timer['revisionTimer']['endTime']).toBeNull();
  });

  test('should handle multiple flips correctly', () => {
    timer.startLog();
    timer.logFlip(false);
    timer.logFlip(true);
    timer.logFlip(false);
    expect(timer['timesFlipped']).toBe(2);
    expect(timer['faceDownTimer']['startTime']).toBeNull();
  });

  //TODO FIX THESE TESTS!!!

  // test('should save the log correctly and return the updated logs', () => {
  //   const timer = new FlashcardUsageTimer();
  
  //   // Mock the Timer class and its methods
  //   const mockFaceDownTimer = {
  //     getDuration: jest.fn().mockReturnValue(100),
  //     reset: jest.fn(),
  //     start: jest.fn(),
  //     stop: jest.fn(),
  //   };
  //   const mockRevisionTimer = {
  //     getDuration: jest.fn().mockReturnValue(200),
  //     reset: jest.fn(),
  //     start: jest.fn(),
  //     stop: jest.fn(),
  //   };
  
  //   // Replace the timers in the FlashcardUsageTimer instance with the mocks
  //   timer['faceDownTimer'] = mockFaceDownTimer as any;
  //   timer['revisionTimer'] = mockRevisionTimer as any;
  
  //   // Mock the setLogs function
  //   const setLogs = jest.fn((value: SetStateAction<FlashcardUsageLog[]>) => {
  //     const prevLogs: FlashcardUsageLog[] = [];
  //     const newLogs = typeof value === 'function' ? (value as (logs: FlashcardUsageLog[]) => FlashcardUsageLog[])(prevLogs) : value;
  //     return newLogs;
  //   });
  
  //   timer.startLog();
  //   timer.logFlip(false);
  //   timer.saveLog('test-uuid', setLogs);
  
  //   // Check if setLogs was called with a function
  //   expect(setLogs).toHaveBeenCalledWith(expect.any(Function));
  
  //   // Execute the function passed to setLogs and check the result
  //   const logFunction = setLogs.mock.calls[0][0];
  //   const prevLogs: FlashcardUsageLog[] = [];
  //   const newLogs = typeof logFunction === 'function' ? logFunction(prevLogs) : logFunction;
  
  //   // Check if the new logs contain the expected log entry
  //   expect(newLogs).toEqual(expect.arrayContaining([
  //     expect.objectContaining({
  //       cardUUID: 'test-uuid',
  //       faceDownTime: 100,
  //       revisionTime: 200,
  //       timesFlipped: 1,
  //     })
  //   ]));
  // });

  // test('should handle multiple logs correctly', () => {
  //   const timer = new FlashcardUsageTimer();
  
  //   // Mock the Timer class and its methods
  //   const mockFaceDownTimer = {
  //     getDuration: jest.fn().mockReturnValue(100),
  //     reset: jest.fn(),
  //     start: jest.fn(),
  //     stop: jest.fn(),
  //   };
  //   const mockRevisionTimer = {
  //     getDuration: jest.fn().mockReturnValue(200),
  //     reset: jest.fn(),
  //     start: jest.fn(),
  //     stop: jest.fn(),
  //   };
  
  //   // Replace the timers in the FlashcardUsageTimer instance with the mocks
  //   timer['faceDownTimer'] = mockFaceDownTimer as any;
  //   timer['revisionTimer'] = mockRevisionTimer as any;
  
  //   // Mock the setLogs function
  //   const setLogs = jest.fn((value: SetStateAction<FlashcardUsageLog[]>) => {
  //     const prevLogs: FlashcardUsageLog[] = [];
  //     const newLogs = typeof value === 'function' ? (value as (logs: FlashcardUsageLog[]) => FlashcardUsageLog[])(prevLogs) : value;
  //     return newLogs;
  //   });
  
  //   timer.startLog();
  //   timer.logFlip(false);
  //   timer.saveLog('test-uuid-1', setLogs);
  //   timer.logFlip(false);
  //   timer.saveLog('test-uuid-2', setLogs);
  
  //   // Check if setLogs was called with a function
  //   expect(setLogs).toHaveBeenCalledWith(expect.any(Function));
  //   expect(setLogs).toHaveBeenCalledTimes(2);
  
  //   // Execute the function passed to setLogs and check the result
  //   const logFunction1 = setLogs.mock.calls[0][0];
  //   const logFunction2 = setLogs.mock.calls[1][0];
  //   const prevLogs: FlashcardUsageLog[] = [];
  //   const newLogs1 = typeof logFunction1 === 'function' ? logFunction1(prevLogs) : logFunction1;
  //   const newLogs2 = typeof logFunction2 === 'function' ? logFunction2(prevLogs) : logFunction2;
  
  //   // Check if the new logs contain the expected log entry
  //   expect(newLogs1).toEqual(expect.arrayContaining([
  //     expect.objectContaining({
  //       cardUUID: 'test-uuid-1',
  //       faceDownTime: 100,
  //       revisionTime: 200,
  //       timesFlipped: 1,
  //     })
  //   ]));
  //   expect(newLogs2).toEqual(expect.arrayContaining([
  //     expect.objectContaining({
  //       cardUUID: 'test-uuid-2',
  //       faceDownTime: 100,
  //       revisionTime: 200,
  //       timesFlipped: 1,
  //     })
  //   ]));
  // });
});