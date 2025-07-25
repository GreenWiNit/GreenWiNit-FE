export interface FormState {
  id: string | null
  name: string
  date: Date | null
  startAt: Date | null
  endAt: Date | null
  address: {
    roadAddress: string
    roadnameCode: string
    zonecode: string
    detailAddress: string
    sigungu: string
  }
  description: string
  maxMemberCount: number
  openChatUrl: string
}

export interface UpsertPageBodyProps {
  initialData?: FormState | null
  onSubmit: (data: FormState) => void
  mode: 'enroll' | 'modify'
}
