def announcement(f):
    def wrapper():
        print("About to run the function...")
        f()
        print("Done with the function.")

@announcement
def hello():
    print("Hello world.")

hello()
    