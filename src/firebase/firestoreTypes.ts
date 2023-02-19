import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

export type DocWithNotFound<Doc> =
  | (Doc & {
      notFound?: boolean;
    })
  | null;

export type DocWithIdAndDate<Doc> = Doc & {
  id?: string;
  date?: Date;
};

export interface ProfileLazy<Doc> {
  data: DocWithIdAndDate<Doc>;
  lastVisible: QueryDocumentSnapshot<DocumentData>;
}
