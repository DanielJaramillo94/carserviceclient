# Most important used components

There are 5 main components: home, car-list, car-edit, owner-list and owner-edit. <br/>
Home component holds car-list and owner-list (which are self explanatory because of their names) on a flex layout, and from there we can navigate to the respective editor component. <br/>
The most important service is car.service, which is the responsible for making all the needed requests to backend. All components but home make use of this component.
