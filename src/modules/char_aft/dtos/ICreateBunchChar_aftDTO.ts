interface IObjectRequest {
  value: string;
  label: string;
}

export default interface ICreateBunchCharAftDTO {
  character_id: string;
  items: IObjectRequest[];
}
