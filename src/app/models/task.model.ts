export type TaskType = {
  id: string,
  title: string,
  description: string,
  deadline: string,
  priority: string,
  status: string,
  performersID: Array<number>
}

export type SortOrderType = {
  header?: string,
  order: 'original' | 'ascending' | 'descending',
  icon: 'list' | 'arrow_upward' | 'arrow_downward',
}