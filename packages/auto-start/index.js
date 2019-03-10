import autoStart from './base';
import dragAxis from './dragAxis';
import hold from './hold';
function install(scope) {
    autoStart.install(scope);
    hold.install(scope);
    dragAxis.install(scope);
}
export { autoStart, hold, dragAxis, install, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxRQUFRLENBQUE7QUFDOUIsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFBO0FBQ2pDLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQTtBQUV6QixTQUFTLE9BQU8sQ0FBRSxLQUFLO0lBQ3JCLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFFRCxPQUFPLEVBQ0wsU0FBUyxFQUNULElBQUksRUFDSixRQUFRLEVBQ1IsT0FBTyxHQUNSLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXV0b1N0YXJ0IGZyb20gJy4vYmFzZSdcbmltcG9ydCBkcmFnQXhpcyBmcm9tICcuL2RyYWdBeGlzJ1xuaW1wb3J0IGhvbGQgZnJvbSAnLi9ob2xkJ1xuXG5mdW5jdGlvbiBpbnN0YWxsIChzY29wZSkge1xuICBhdXRvU3RhcnQuaW5zdGFsbChzY29wZSlcbiAgaG9sZC5pbnN0YWxsKHNjb3BlKVxuICBkcmFnQXhpcy5pbnN0YWxsKHNjb3BlKVxufVxuXG5leHBvcnQge1xuICBhdXRvU3RhcnQsXG4gIGhvbGQsXG4gIGRyYWdBeGlzLFxuICBpbnN0YWxsLFxufVxuIl19