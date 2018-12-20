
export class PortAdress {
  unit: number;
  port: number;
}


export class LinkEndPoint {
  neid: number;
  nename: string;
  unitname: string;
  portadress: PortAdress;
}

export class Link {
    id: number;
    name: string;
    bandwith: number;
    aend: LinkEndPoint;
    zend: LinkEndPoint;
}



