interface IObjectRequest {
  value: string;
  label: string;
}

export default interface ICreateBunchCharTeamDTO {
  character_id: string;
  items: IObjectRequest[];
}
