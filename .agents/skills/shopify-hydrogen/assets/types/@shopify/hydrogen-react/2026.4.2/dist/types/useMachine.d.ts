import { StateMachine, EventObject } from '@xstate/fsm';
export declare function useMachine<TC extends object, TE extends EventObject, TS extends {
    value: any;
    context: TC;
}>(stateMachine: StateMachine.Machine<TC, TE, TS>, options?: {
    actions?: StateMachine.ActionMap<TC, TE>;
}): readonly [
    StateMachine.State<TC, TE, TS>,
    StateMachine.Service<TC, TE, TS>['send'],
    StateMachine.Service<TC, TE, TS>
];
