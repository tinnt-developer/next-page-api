import { Session } from 'next-auth';

export function compose(...fns) {
  return function (x) {
    return fns.reduceRight((y, f) => f(y), x);
  };
}

export function isAsync(fn) {
  return fn.constructor.name === 'AsyncFunction';
}

export function isAdmin(session: Session | null) {
  return session?.user?.roles.some(({ name }) => name === 'Admin');
}
