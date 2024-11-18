export interface SignInResult {
  token: string;
  fromLocal: boolean;
}

export interface Credential {
  email: string;
  password: string;
}

export interface SubCollectionItem {
  id: string;        
  soLuong: number;    
  trangThai: string;  
}

export interface LacLocVang extends SubCollectionItem {}
export interface LiXi extends SubCollectionItem {}
export interface MaSoMayMan extends SubCollectionItem {}