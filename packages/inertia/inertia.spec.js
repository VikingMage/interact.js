import test from '@interactjs/_dev/test/test';
import drag from '@interactjs/actions/drag';
import * as helpers from '@interactjs/core/tests/_helpers';
import inertia from './';
test('inertia', t => {
    const { scope, interaction, target, interactable, coords, event, } = helpers.testEnv({ plugins: [inertia, drag] });
    const element = target;
    const modifierChange = 5;
    const testModifier = {
        options: { endOnly: true },
        methods: { set({ coords: modifierCoords }) {
                modifierCoords.x += modifierChange;
                modifierCoords.y += modifierChange;
                modifierCallCount++;
            } },
    };
    let modifierCallCount = 0;
    coords.client = coords.page;
    scope.now = () => coords.timeStamp;
    interactable.draggable({ inertia: true });
    // test inertia without modifiers or throw
    downStartMoveUp({ x: 100, y: 0, dt: 1000 });
    t.notOk(interaction.inertia.active, '{ modifiers: [] } && !thrown: inertia is not activated');
    // test inertia without modifiers and with throw
    downStartMoveUp({ x: 100, y: 0, dt: 10 });
    t.ok(interaction.inertia.active, 'thrown: inertia is activated');
    interactable.draggable({ modifiers: [testModifier] });
    // test inertia with { endOnly: true } modifier and with throw
    downStartMoveUp({ x: 100, y: 0, dt: 10 });
    t.equal(modifierCallCount, 1, '{ endOnly: true } && thrown: modifier is not called from pointerUp');
    t.deepEqual(helpers.getProps(interaction.inertia, ['modifiedXe', 'modifiedYe']), {
        modifiedXe: interaction.inertia.xe + modifierChange,
        modifiedYe: interaction.inertia.ye + modifierChange,
    }, '{ endOnly: true } && thrown: inertia target coords are correct');
    // test smoothEnd with { endOnly: false } modifier
    testModifier.options.endOnly = false;
    downStartMoveUp({ x: 1, y: 0, dt: 1000 });
    t.notOk(interaction.inertia.active, '{ endOnly: false } && !thrown: inertia smoothEnd is not activated');
    t.equal(modifierCallCount, 2, '{ endOnly: false } && !thrown: modifier is called from pointerUp');
    // test smoothEnd with { endOnly: true } modifier
    testModifier.options.endOnly = true;
    downStartMoveUp({ x: 1, y: 0, dt: 1000 });
    t.ok(interaction.inertia.active, '{ endOnly: true } && !thrown: inertia smoothEnd is activated');
    t.equal(modifierCallCount, 1, '{ endOnly: true } && !thrown: modifier is not called from pointerUp');
    interaction.stop();
    t.end();
    function downStartMoveUp({ x, y, dt }) {
        modifierCallCount = 0;
        coords.timeStamp = 0;
        interaction.stop();
        Object.assign(coords.page, { x: 0, y: 0 });
        interaction.pointerDown(event, event, element);
        interaction.start({ name: 'drag' }, interactable, element);
        Object.assign(coords.page, { x, y });
        coords.timeStamp = dt;
        interaction.pointerMove(event, event, element);
        interaction.pointerUp(event, event, element, element);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5lcnRpYS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5lcnRpYS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLDRCQUE0QixDQUFBO0FBQzdDLE9BQU8sSUFBSSxNQUFNLDBCQUEwQixDQUFBO0FBQzNDLE9BQU8sS0FBSyxPQUFPLE1BQU0saUNBQWlDLENBQUE7QUFDMUQsT0FBTyxPQUFPLE1BQU0sSUFBSSxDQUFBO0FBRXhCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDbEIsTUFBTSxFQUNKLEtBQUssRUFDTCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxHQUNOLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakQsTUFBTSxPQUFPLEdBQUcsTUFBcUIsQ0FBQTtJQUNyQyxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUE7SUFDeEIsTUFBTSxZQUFZLEdBQUc7UUFDbkIsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtRQUMxQixPQUFPLEVBQUUsRUFBRSxHQUFHLENBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFO2dCQUN4QyxjQUFjLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQTtnQkFDbEMsY0FBYyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUE7Z0JBQ2xDLGlCQUFpQixFQUFFLENBQUE7WUFDckIsQ0FBQyxFQUFFO0tBQ0osQ0FBQTtJQUVELElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFBO0lBRXpCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtJQUMzQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDbEMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBRXpDLDBDQUEwQztJQUMxQyxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSx3REFBd0QsQ0FBQyxDQUFBO0lBRTdGLGdEQUFnRDtJQUNoRCxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSw4QkFBOEIsQ0FBQyxDQUFBO0lBRWhFLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxZQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTVELDhEQUE4RDtJQUM5RCxlQUFlLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsb0VBQW9FLENBQUMsQ0FBQTtJQUNuRyxDQUFDLENBQUMsU0FBUyxDQUNULE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUNuRTtRQUNFLFVBQVUsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxjQUFjO1FBQ25ELFVBQVUsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxjQUFjO0tBQ3BELEVBQ0QsZ0VBQWdFLENBQUMsQ0FBQTtJQUVuRSxrREFBa0Q7SUFDbEQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3BDLGVBQWUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN6QyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLG1FQUFtRSxDQUFDLENBQUE7SUFDeEcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsa0VBQWtFLENBQUMsQ0FBQTtJQUVqRyxpREFBaUQ7SUFDakQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO0lBQ25DLGVBQWUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN6QyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLDhEQUE4RCxDQUFDLENBQUE7SUFDaEcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUscUVBQXFFLENBQUMsQ0FBQTtJQUVwRyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRVAsU0FBUyxlQUFlLENBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNwQyxpQkFBaUIsR0FBRyxDQUFDLENBQUE7UUFDckIsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUE7UUFDcEIsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO1FBRWxCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDMUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRTlDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRTFELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3BDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM5QyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZELENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ0BpbnRlcmFjdGpzL19kZXYvdGVzdC90ZXN0J1xuaW1wb3J0IGRyYWcgZnJvbSAnQGludGVyYWN0anMvYWN0aW9ucy9kcmFnJ1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICdAaW50ZXJhY3Rqcy9jb3JlL3Rlc3RzL19oZWxwZXJzJ1xuaW1wb3J0IGluZXJ0aWEgZnJvbSAnLi8nXG5cbnRlc3QoJ2luZXJ0aWEnLCB0ID0+IHtcbiAgY29uc3Qge1xuICAgIHNjb3BlLFxuICAgIGludGVyYWN0aW9uLFxuICAgIHRhcmdldCxcbiAgICBpbnRlcmFjdGFibGUsXG4gICAgY29vcmRzLFxuICAgIGV2ZW50LFxuICB9ID0gaGVscGVycy50ZXN0RW52KHsgcGx1Z2luczogW2luZXJ0aWEsIGRyYWddIH0pXG4gIGNvbnN0IGVsZW1lbnQgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnRcbiAgY29uc3QgbW9kaWZpZXJDaGFuZ2UgPSA1XG4gIGNvbnN0IHRlc3RNb2RpZmllciA9IHtcbiAgICBvcHRpb25zOiB7IGVuZE9ubHk6IHRydWUgfSxcbiAgICBtZXRob2RzOiB7IHNldCAoeyBjb29yZHM6IG1vZGlmaWVyQ29vcmRzIH0pIHtcbiAgICAgIG1vZGlmaWVyQ29vcmRzLnggKz0gbW9kaWZpZXJDaGFuZ2VcbiAgICAgIG1vZGlmaWVyQ29vcmRzLnkgKz0gbW9kaWZpZXJDaGFuZ2VcbiAgICAgIG1vZGlmaWVyQ2FsbENvdW50KytcbiAgICB9IH0sXG4gIH1cblxuICBsZXQgbW9kaWZpZXJDYWxsQ291bnQgPSAwXG5cbiAgY29vcmRzLmNsaWVudCA9IGNvb3Jkcy5wYWdlXG4gIHNjb3BlLm5vdyA9ICgpID0+IGNvb3Jkcy50aW1lU3RhbXBcbiAgaW50ZXJhY3RhYmxlLmRyYWdnYWJsZSh7IGluZXJ0aWE6IHRydWUgfSlcblxuICAvLyB0ZXN0IGluZXJ0aWEgd2l0aG91dCBtb2RpZmllcnMgb3IgdGhyb3dcbiAgZG93blN0YXJ0TW92ZVVwKHsgeDogMTAwLCB5OiAwLCBkdDogMTAwMCB9KVxuICB0Lm5vdE9rKGludGVyYWN0aW9uLmluZXJ0aWEuYWN0aXZlLCAneyBtb2RpZmllcnM6IFtdIH0gJiYgIXRocm93bjogaW5lcnRpYSBpcyBub3QgYWN0aXZhdGVkJylcblxuICAvLyB0ZXN0IGluZXJ0aWEgd2l0aG91dCBtb2RpZmllcnMgYW5kIHdpdGggdGhyb3dcbiAgZG93blN0YXJ0TW92ZVVwKHsgeDogMTAwLCB5OiAwLCBkdDogMTAgfSlcbiAgdC5vayhpbnRlcmFjdGlvbi5pbmVydGlhLmFjdGl2ZSwgJ3Rocm93bjogaW5lcnRpYSBpcyBhY3RpdmF0ZWQnKVxuXG4gIGludGVyYWN0YWJsZS5kcmFnZ2FibGUoeyBtb2RpZmllcnM6IFt0ZXN0TW9kaWZpZXIgYXMgYW55XSB9KVxuXG4gIC8vIHRlc3QgaW5lcnRpYSB3aXRoIHsgZW5kT25seTogdHJ1ZSB9IG1vZGlmaWVyIGFuZCB3aXRoIHRocm93XG4gIGRvd25TdGFydE1vdmVVcCh7IHg6IDEwMCwgeTogMCwgZHQ6IDEwIH0pXG4gIHQuZXF1YWwobW9kaWZpZXJDYWxsQ291bnQsIDEsICd7IGVuZE9ubHk6IHRydWUgfSAmJiB0aHJvd246IG1vZGlmaWVyIGlzIG5vdCBjYWxsZWQgZnJvbSBwb2ludGVyVXAnKVxuICB0LmRlZXBFcXVhbChcbiAgICBoZWxwZXJzLmdldFByb3BzKGludGVyYWN0aW9uLmluZXJ0aWEsIFsnbW9kaWZpZWRYZScsICdtb2RpZmllZFllJ10pLFxuICAgIHtcbiAgICAgIG1vZGlmaWVkWGU6IGludGVyYWN0aW9uLmluZXJ0aWEueGUgKyBtb2RpZmllckNoYW5nZSxcbiAgICAgIG1vZGlmaWVkWWU6IGludGVyYWN0aW9uLmluZXJ0aWEueWUgKyBtb2RpZmllckNoYW5nZSxcbiAgICB9LFxuICAgICd7IGVuZE9ubHk6IHRydWUgfSAmJiB0aHJvd246IGluZXJ0aWEgdGFyZ2V0IGNvb3JkcyBhcmUgY29ycmVjdCcpXG5cbiAgLy8gdGVzdCBzbW9vdGhFbmQgd2l0aCB7IGVuZE9ubHk6IGZhbHNlIH0gbW9kaWZpZXJcbiAgdGVzdE1vZGlmaWVyLm9wdGlvbnMuZW5kT25seSA9IGZhbHNlXG4gIGRvd25TdGFydE1vdmVVcCh7IHg6IDEsIHk6IDAsIGR0OiAxMDAwIH0pXG4gIHQubm90T2soaW50ZXJhY3Rpb24uaW5lcnRpYS5hY3RpdmUsICd7IGVuZE9ubHk6IGZhbHNlIH0gJiYgIXRocm93bjogaW5lcnRpYSBzbW9vdGhFbmQgaXMgbm90IGFjdGl2YXRlZCcpXG4gIHQuZXF1YWwobW9kaWZpZXJDYWxsQ291bnQsIDIsICd7IGVuZE9ubHk6IGZhbHNlIH0gJiYgIXRocm93bjogbW9kaWZpZXIgaXMgY2FsbGVkIGZyb20gcG9pbnRlclVwJylcblxuICAvLyB0ZXN0IHNtb290aEVuZCB3aXRoIHsgZW5kT25seTogdHJ1ZSB9IG1vZGlmaWVyXG4gIHRlc3RNb2RpZmllci5vcHRpb25zLmVuZE9ubHkgPSB0cnVlXG4gIGRvd25TdGFydE1vdmVVcCh7IHg6IDEsIHk6IDAsIGR0OiAxMDAwIH0pXG4gIHQub2soaW50ZXJhY3Rpb24uaW5lcnRpYS5hY3RpdmUsICd7IGVuZE9ubHk6IHRydWUgfSAmJiAhdGhyb3duOiBpbmVydGlhIHNtb290aEVuZCBpcyBhY3RpdmF0ZWQnKVxuICB0LmVxdWFsKG1vZGlmaWVyQ2FsbENvdW50LCAxLCAneyBlbmRPbmx5OiB0cnVlIH0gJiYgIXRocm93bjogbW9kaWZpZXIgaXMgbm90IGNhbGxlZCBmcm9tIHBvaW50ZXJVcCcpXG5cbiAgaW50ZXJhY3Rpb24uc3RvcCgpXG4gIHQuZW5kKClcblxuICBmdW5jdGlvbiBkb3duU3RhcnRNb3ZlVXAgKHsgeCwgeSwgZHQgfSkge1xuICAgIG1vZGlmaWVyQ2FsbENvdW50ID0gMFxuICAgIGNvb3Jkcy50aW1lU3RhbXAgPSAwXG4gICAgaW50ZXJhY3Rpb24uc3RvcCgpXG5cbiAgICBPYmplY3QuYXNzaWduKGNvb3Jkcy5wYWdlLCB7IHg6IDAsIHk6IDAgfSlcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyRG93bihldmVudCwgZXZlbnQsIGVsZW1lbnQpXG5cbiAgICBpbnRlcmFjdGlvbi5zdGFydCh7IG5hbWU6ICdkcmFnJyB9LCBpbnRlcmFjdGFibGUsIGVsZW1lbnQpXG5cbiAgICBPYmplY3QuYXNzaWduKGNvb3Jkcy5wYWdlLCB7IHgsIHkgfSlcbiAgICBjb29yZHMudGltZVN0YW1wID0gZHRcbiAgICBpbnRlcmFjdGlvbi5wb2ludGVyTW92ZShldmVudCwgZXZlbnQsIGVsZW1lbnQpXG4gICAgaW50ZXJhY3Rpb24ucG9pbnRlclVwKGV2ZW50LCBldmVudCwgZWxlbWVudCwgZWxlbWVudClcbiAgfVxufSlcbiJdfQ==