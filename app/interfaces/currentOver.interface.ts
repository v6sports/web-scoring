export interface IcurrentOver {
  ballsOfOver?: IballsOfOver[];
}

export interface IballsOfOver {
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
