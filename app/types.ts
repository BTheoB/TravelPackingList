export interface ListElementType {
  idList: number;
  idSublist: number;
  idElem: number;
  titre: string;
  checked: boolean;
}

export interface SubListType {
  idList: number;
  idSublist: number;
  titre: string;
}

export interface ListType {
  idList: number;
  titre: string;
  dateCrea: string;
}