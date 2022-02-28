import { VueConstructor } from 'vue'

export type IBlockImage = {
  type: 'text'
  name: string
  value: string
}

export type IBlockText = {
  type: 'image'
  name: string
  value: FileList
}

export type IBlock = IBlockImage | IBlockText
type BlockType = Pick<IBlock, 'type'>
type BlockValue = Pick<IBlock, 'value'>

export type IBlockAdd = IBlock & {
  defaultValue: BlockValue['value']
  isBlockEmpty(): boolean,
  component: VueConstructor
}

export type IBlockData = IBlock[]
export type IBlockAddData = IBlockAdd[]
