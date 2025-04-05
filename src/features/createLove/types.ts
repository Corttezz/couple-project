export interface DateCounterData {
  date: Date | null;
  textType: string;
}

export interface FormData {
  pageName: string;
  pageTitle: string;
  startDate: DateCounterData;  // Alterado de Date para DateCounterData
  message: string;
  photos: File[];
  spotifyLink: string;
  backgroundEffect: string;
}

export interface PageData {
  pageTitle: string;
  startDate: {
    date: string;
    textType: string;
  };
  message: string;
  photos: string[];
  spotifyUrl?: string;
  backgroundEffect?: string;
} 