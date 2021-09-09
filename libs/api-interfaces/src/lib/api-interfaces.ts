export interface Box {
  id: string;
  name: string;
  owner: string;
  quickFact: string;
  memberAmount: number;
}

export const emptyBox = {
  id: '',
  name: '',
  owner: '',
  quickFact: '',
  memberAmount: 0,
};
