/**
 * Timer class
 */
class Timer {
  private startTime: number | null = null;
  private endTime: number | null = null;

  // Start the timer
  public start(): void {
    this.startTime = Date.now();
    return;
  };

  // Stop the timer
  public stop(): void {
    if(this.startTime) this.endTime = Date.now();
    return;
  };

  // Get the duration in milliseconds
  public getDuration(): number {
    if(this.startTime && this.endTime) return this.endTime - this.startTime;
    return 0;
  };

  // Reset the timer
  public reset(): void {
    this.startTime = null;
    this.endTime = null;
    return;
  };
};

export default Timer;