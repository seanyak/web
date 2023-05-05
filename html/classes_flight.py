from sre_constants import SUCCESS


class Flight():
    def __init__(self, capacity):
        self.capacity = capacity
        self.passengers = []

    def addpassenger(self, name):
        if not self.openseats():
            return False 
        self.passengers.append(name)
        return True

    def openseats(self):
        return self.capacity - len(self.passengers)

flight = Flight(1)

people = ["Mark", "Bippy", "Mooma", "Richard", "Anus"]
for person in people:
    flight.addpassenger(person)
    if SUCCESS:
        print(f"Added {person} to flight successfully!")
    else:
        print(f"No available seats for {person}")