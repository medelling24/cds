export class Evidence {
  id: string;
  timestamp: number;
  type: number = 3;
  userId: string;
  challengeId: string;
  latitude: number;
  longitude: number;
  altitude: number;
  isSync: boolean;
  survey: any;
  surveyAnswers: any;
  level: number;
}
