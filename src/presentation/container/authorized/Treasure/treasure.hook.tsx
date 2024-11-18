import { useState, useEffect } from 'react';
import { listenToUserData, listenToSubCollection } from '../../../../data/data-source/user';

export const useTreasureData = (userId: string) => {
  const [userData, setUserData] = useState<any>(null);
  const [lacLocVang, setLacLocVang] = useState<any[]>([]);
  const [liXi, setLiXi] = useState<any[]>([]);
  const [maSoMayMan, setMaSoMayMan] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribeUser = listenToUserData(userId, setUserData);

    const unsubscribeLacLocVang = listenToSubCollection(userId, 'laclocvang', setLacLocVang);
    const unsubscribeLiXi = listenToSubCollection(userId, 'lixi', setLiXi);
    console.log(unsubscribeLiXi())
    const unsubscribeMaSoMayMan = listenToSubCollection(userId, 'masomayman', setMaSoMayMan);
    
    return () => {
      unsubscribeUser();
      unsubscribeLacLocVang();
      unsubscribeLiXi();
      unsubscribeMaSoMayMan();
    };
  }, [userId]);

  return { userData, lacLocVang, liXi, maSoMayMan };
};
