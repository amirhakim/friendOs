# Frndos

## Amir's Notes

    1. side bar where you have 2 choices : add , view :
        1. use routing to switch between these 
        1. Add: the form to add a new person to the network, the friends field may have auto-complete/suggestion
        1. View: search box for a person with auto-complete/suggestion, and graph once one is selected
    1. alternative view: complete view of all the friends in the network
        1. we need to add details visualization to the nodes
    1. as it is designed now, having feature modules is not useful
        1. we could argue that we can separate the parts where we do editing on the "person" and "friends" from the View parts, or at least the graph should be in it's own moduel. We would need to sync ngrx between both modules

## TODO
    1. naming the person a friend, then naming the connections/friends of the person as friends is very confusing
    1. fix deprecated packages and fix breaking changes
    1. ng build --prod and fix errors
    1. setMinuSet() should be implemented in the Array.prototype