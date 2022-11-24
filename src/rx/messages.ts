import { MessagesState } from "types/appTypes";
import { ReplaySubject } from "rxjs";

const subject = new ReplaySubject<MessagesState>(1);

export const messagesStore = {
  subscribe: (setState: any) => subject.subscribe(setState),
  push: (tag: string, message: string) => {
    if (tag === "info") {
      subject.next({
        info: message,
      });
    }

    if (tag === "success") {
      subject.next({
        success: message,
      });
    }

    if (tag === "error") {
      subject.next({
        error: message,
      });
    }
  },
  reset: () => {
    subject.next({});
  },
};
