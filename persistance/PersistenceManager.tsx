import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('mayaDb.db');

// Fonction pour créer la table
export const createTable = async () => {
  (await db).execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS listes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, titre TEXT NOT NULL, dateCrea DATETIME DEFAULT CURRENT_TIMESTAMP, archived INTEGER default 0);

    CREATE TABLE IF NOT EXISTS subListes (idList INTEGER, idSublist INTEGER, titre TEXT NOT NULL, 
    PRIMARY KEY (idList, idSublist), 
    FOREIGN KEY (idList) REFERENCES listes(id) ON DELETE CASCADE);

    CREATE TABLE IF NOT EXISTS elements (idList INTEGER, idSublist INTEGER ,idElem INTEGER, titre TEXT NOT NULL, checked INTEGER DEFAULT 0,
    PRIMARY KEY (idList,idSublist, idElem),
    FOREIGN KEY (idList, idSublist) REFERENCES subListes(idList, idSublist) ON DELETE CASCADE);
    `).catch((err) => {
      console.log('err dans la cré  tion de la table ', err)
    })
};

export const dropAllTable = async () => {
  (await db).execAsync(`
    DROP TABLE IF EXISTS elements;
    DROP TABLE IF EXISTS subListes;
    DROP TABLE IF EXISTS listes;
  `);
}

export const initFirstUse = async () => {
  (await db).getFirstAsync(`SELECT name FROM sqlite_master WHERE type='table' AND (name='listes') ;`).then(async (result) => {

    if (result == null || result == undefined) {
      await createTable();
      await addList('VOYAGE AU COEUR DE THEO');
      await addSubList(1, 'CLOTHES').then(() => {
        addElement(1, 1, 'PULL');
        addElement(1, 1, 'PANTALON');
        addElement(1, 1, 'PAIRE DE Dé');
        addElement(1, 1, 'SAC REMPLIT DE BISOUX');
        addElement(1, 1, 'MON PROPRE COEUR');
      });
      await addSubList(1, 'FOOD');
      addElement(1, 2, 'DATTES');
      addElement(1, 2, 'FROMAGE');
      addElement(1, 2, 'GNOCCHI');
      await addSubList(1, 'LOVE');
      addElement(1, 3, 'JE');
      addElement(1, 3, 'T\'');
      addElement(1, 3, 'AIME');
      addElement(1, 3, 'MAYA');

      await addSubList(1, 'NE PAS OUBLIER DE').then(() => {
        addElement(1, 4, 'FAIRE DES CALINS à THEO');
        addElement(1, 4, 'FAIRE DES BISOUS à THEO');
        addElement(1, 4, 'RIGOLER AVEC THEO');
        addElement(1, 4, 'DIRE THEO A THEO QUE TU L\'AIME');
        addElement(1, 4, 'PRENDRE THEO EN CUILLIeRE');
        addElement(1, 4, 'zEt si l\'envie vous en prend...');
        addElement(1, 4, 'zFAIRE L\'AMOUR A THEO...');
      });
      
      await addList('Liste de courses');
      await addSubList(2, 'Légumes');
      addElement(2, 1, 'Carottes');
      addElement(2, 1, 'Champignons');
      addElement(2, 1, 'Potiron');
      await addSubList(2, 'Fruits');
      addElement(2, 2, 'Pommes');
      addElement(2, 2, 'Clémentines');
      addElement(2, 2, 'Maya la plus belle');
    }

  }).catch((err) => {
    console.log('err', err);
  });
}

export const resetSchema = async () => {
  await (await db).execAsync(`
    DROP TABLE IF EXISTS elements;
    DROP TABLE IF EXISTS subListes;
    DROP TABLE IF EXISTS listes;
  `).then((result) => {
    createTable();
  }).catch((err) => {
    console.log('err', err)
  });
}

export const resetBase = async () => {
  (await db).execAsync(`
    DELETE FROM elements;
    DELETE FROM subListes;
    DELETE FROM listes;
    `);
};

export const initConextTest = async () => {
  await resetSchema().then(async () => {
    await addList('VOYAGE AU COEUR DE THEO');
    
    await addSubList(1, 'CLOTHES').then(() => {
      addElement(1, 1, 'PULL');
      addElement(1, 1, 'PANTALON');
      addElement(1, 1, 'PAIRE DE Dé');
      addElement(1, 1, 'SAC REMPLIT DE BISOUX');
      addElement(1, 1, 'MON PROPRE COEUR');
    });
    await addSubList(1, 'FOOD');
    addElement(1, 2, 'DATTES');
    addElement(1, 2, 'FROMAGE');
    addElement(1, 2, 'GNOCCHI');
    await addSubList(1, 'LOVE');
    addElement(1, 3, 'JE');
    addElement(1, 3, 'T\'');
    addElement(1, 3, 'AIME');
    addElement(1, 3, 'MAYA');

    await addSubList(1, 'NE PAS OUBLIER DE').then(() => {
      addElement(1, 4, 'FAIRE DES CALINS à THEO');
      addElement(1, 4, 'FAIRE DES BISOUS à THEO');
      addElement(1, 4, 'RIGOLER AVEC THEO');
      addElement(1, 4, 'DIRE THEO A THEO QUE TU L\'AIME');
      addElement(1, 4, 'PRENDRE THEO EN CUILLIeRE');
      addElement(1, 4, 'zEt si l\'envie vous en prend...');
      addElement(1, 4, 'zFAIRE L\'AMOUR A THEO...');
    });
    
    await addList('Liste de courses');
    await addSubList(2, 'Légumes');
    addElement(2, 1, 'Carottes');
    addElement(2, 1, 'Champignons');
    addElement(2, 1, 'Potiron');
    await addSubList(2, 'Fruits');
    addElement(2, 2, 'Pommes');
    addElement(2, 2, 'Clémentines');
    addElement(2, 2, 'Maya la plus belle');
  });
};


//GESTION DES LISTES **************************************************************************************************

export const addList = async (titre: string) => {
  (await db).runAsync(`INSERT INTO listes (titre, dateCrea) VALUES ('${titre}', datetime('now'))`);
}
export const deleteList = async (id: number) => {
  (await db).execAsync(`
    DELETE FROM elements WHERE idList = ${id};
    DELETE FROM subListes WHERE idList = ${id};
    DELETE FROM listes WHERE id = ${id};
    `);
}

export const getLists = async () => {
  return (await db).getAllAsync('SELECT * FROM listes');
}

export const getNoneArchivedLists = async () => {
  return (await db).getAllAsync('SELECT * FROM listes WHERE archived = 0');
}
export const getArchivedLists = async () => {
  return (await db).getAllAsync('SELECT * FROM listes WHERE archived = 1');
}
export const getList = async (id: number) => {
  return (await db).getFirstAsync('SELECT * FROM listes WHERE id = ?', [id]);
}

export const archiveList = async (id: number, value: number) => {
  (await db).execAsync(`UPDATE elements SET checked = 0 WHERE id = ${id}`);
  return (await db).execAsync(`UPDATE listes SET archived = ${value} WHERE id = ${id}`);
} 

export const isArchived = async (id: number) => {
  return (await db).getFirstAsync('SELECT archived FROM listes WHERE id = ?', [id]);
} 

//Duplique une liste avec toutes ses sous listes et elements
export const duplicateArchive = async (idList: number, titre : string) => {
  await (await db).
  //Créer une nouvelle liste avecl e new titre et récupère son id
  runAsync('INSERT INTO listes (titre, dateCrea) VALUES (?, datetime(\'now\'))', [titre])
  .then((res) =>{
    //On récupère toutes les sous listes de la liste a dupliqué et on créer leur duplicat sur la nouvelle liste
    getSubLists(idList).then(async (subLists) => {
      const subListPromises = subLists.map(async (subList) => {
        await addSubList((res as any).lastInsertRowId, (subList as any).titre);
      });

      await Promise.all(subListPromises);
      // enfin on récupère tous les elements de la listes et on les duplique aussi, une fois que les sous listes on étés créés 
      getElementsViaList(idList).then((elements) => {
        elements.forEach(element => {
          addElement((res as any).lastInsertRowId, (element as any).idSublist, (element as any).titre)
        });
      });
    })
  }).catch((err) => {
    console.log(err)
  });
};

//GESTION DES SUBLISTES **************************************************************************************************
export const addSubList = async (idList: number, titre: string) => {
  (await db).runAsync(`INSERT INTO subListes (idList, idSublist, titre) VALUES (${idList}, (SELECT COALESCE(MAX(idSublist), 0) + 1 FROM subListes WHERE idList = ${idList}), '${titre}')`);
}

//Supprimer toutes les élements d'une sous liste puis supprime la liste
export const deleteSubList = async (idList: number, idSublist: number) => {
  (await db).execAsync(
    `DELETE FROM elements WHERE idList = ${idList} AND idSublist = ${idSublist};
     DELETE FROM subListes WHERE idList = ${idList} AND idSublist = ${idSublist};
    `).catch((err) => {
      console.log(err)
    });
}

export const getSubLists = async (idList: number) => {
  return (await db).getAllAsync('SELECT * FROM subListes WHERE idList = ?', [idList]);
}
export const getSubList = async (idList: number, idSublist: number) => {
  return (await db).getFirstAsync('SELECT * FROM subListes WHERE idList = ? AND idSublist = ?', [idList, idSublist]);
}


//GESTION DES ELEMENTS **************************************************************************************************

export const addElement = async (idList: number, idSublist: number, titre: string) => {
  (await db).runAsync(
  `INSERT INTO elements (idList, idSublist, idElem, titre)
  VALUES (?, ?, 
    (SELECT COALESCE(MAX(idElem), 0) + 1 
      FROM elements 
      WHERE idList = ? AND idSublist = ?),
    ?)`,[idList, idSublist, idList, idSublist, titre]
  ).catch((err) => {
    console.log('err de addElment', err)
  });
}

export const deleteElement = async (idList: number, idSublist: number, idElem: number) => {
  (await db).runAsync(`DELETE FROM elements WHERE idList = ${idList} AND idSublist = ${idSublist} AND idElem = ${idElem}`);
}

export const getElementsViaList = async (idList: number) => {
  return (await db).getAllAsync('SELECT * FROM elements WHERE idList = ?', [idList]);
}

export const getElementsViasubList = async (idList: number, idSublist: number) => {
  return (await db).getAllAsync('SELECT * FROM elements WHERE idList = ?  AND idSublist = ?', [idList, idSublist]);
}

export const getElement = async (idList: number, idSublist: number, idElem: number) => {
  return (await db).getFirstAsync('SELECT * FROM elements WHERE idList = ? AND idSublist = ? AND idElem = ?', [idList, idSublist, idElem]);
}


export const checkElement = async ( idList: number, idSublist: number, idElem: number, checked: number) => {
  return (await db).runAsync('UPDATE elements SET checked = ? WHERE idList = ? AND idSublist = ? AND idElem = ?', [checked, idList, idSublist, idElem]);
}
