export interface ITimer {
    timeLimit: number;
    onTimeUp: () => void;
}