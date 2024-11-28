// Imports
import { SetStateAction } from "react";
import Timer from "./Timer";
import FlashcardUsageLog from "../types/global/FlashcardUsageLog";

/**
 * Type to define the recorded flashcard values
 */
type RecordedFlashcardValues = {
  faceDownTime: number;
  revisionTime: number;
  timesFlipped: number;
};

/**
 * Class to manage the flashcard usage timer
 */
class FlashcardUsageTimer {
  private revisionTime: number = 0;
  private revisionTimer: Timer = new Timer();
  private faceDownTime: number = 0;
  private faceDownTimer: Timer = new Timer();
  private timesFlipped: number = 0;

  // Start the revision timer
  private startRevisionTimer(): void {
    this.revisionTimer.start();
    return;
  };

  // Stop the revision timer
  private stopRevisionTimer(): void {
    this.revisionTimer.stop();
    this.revisionTime = this.revisionTime + this.revisionTimer.getDuration();
    return;
  };

  // Start the face-down timer
  private startFaceDownTimer(): void {
    this.faceDownTimer.start();
    return;
  };

  // Stop the face-down timer
  private stopFaceDownTimer(): void {
    this.faceDownTimer.stop();
    this.faceDownTime = this.faceDownTime + this.faceDownTimer.getDuration();
    return;
  };

  // Reset the face-down timer
  private resetFaceDownTimer(): void {
    this.faceDownTimer.reset();
    return;
  };

  // Increment the flip counter
  private incrementFlipCounter(): void {
    this.timesFlipped++;
    return;
  };

  // Get the recorded values
  private getRecordedValues(): RecordedFlashcardValues {
    return {
      faceDownTime: this.faceDownTime,
      revisionTime: this.revisionTime,
      timesFlipped: this.timesFlipped,
    };
  };

  // Reset the timer
  private reset(): void {
    this.faceDownTime = 0;
    this.timesFlipped = 0;
    this.revisionTime = 0;
    this.faceDownTimer.reset();
    this.revisionTimer.reset();
    return;
  };

  // Start a flashcard log
  public startLog(): void {
    this.reset();
    this.startRevisionTimer();
    this.startFaceDownTimer();
    return;
  };

  // Log a flashcard flip
  public logFlip(cardFlipped: boolean): void {
    if(!cardFlipped) {
      this.stopFaceDownTimer();
      this.resetFaceDownTimer();
      this.incrementFlipCounter();
    };
    if(cardFlipped) {
      this.startFaceDownTimer();
    };
    return;
  };

  // Save the current flashcard log and restart timer
  public saveLog = (
    cardUUID: string,
    setLogs: React.Dispatch<SetStateAction<FlashcardUsageLog[]>>,
  ) => {
    this.stopFaceDownTimer();
    this.stopRevisionTimer();
    setLogs((prev) => [
      ...prev,
      {
        cardUUID: cardUUID,
        ...this.getRecordedValues(),
      },
    ]);
    this.startLog();
    return;
  };
};

export default FlashcardUsageTimer;