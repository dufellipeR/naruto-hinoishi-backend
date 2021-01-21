interface IObjectRequest {
  value: string;
  label: string;
}

export default interface ICreateBunchCharClanDTO {
  character_id: string;
  items: IObjectRequest[];
}
