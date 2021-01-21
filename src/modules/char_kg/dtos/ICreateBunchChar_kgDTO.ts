interface IObjectRequest {
  value: string;
  label: string;
}

export default interface ICreateBunchCharkgDTO {
  character_id: string;
  items: IObjectRequest[];
}
