export interface IcurrentOver {
  ballsOfOver?: IballsOfOver[];
}

export interface IballsOfOver {
	runs: number;
	batsmanId: number | undefined;
  run?: number;
  currentOverNumber?: number;
  ballNumber?: number;
	nextBallNumber?:number
  currentTimeStamp?: string;
  extra?: Extra;
}

export interface Extra {
  isExtra?: boolean;
  type?: string;
  isBallNotCount?: boolean;
  extraRun?: number | string;
}
