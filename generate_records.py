import csv
from faker import Faker
import random

# Initialize Faker
fake = Faker()

# Output file name
output_file = "fake_people_data.csv"

# Define number of rows
num_rows = 50000

# Define CSV headers
headers = [
    "name.firstName",
    "name.lastName",
    "age",
    "address.line1",
    "address.city",
    "address.state",
    "gender"
]

# Define possible genders
genders = ["Male", "Female", "Other"]

# Create and write CSV
with open(output_file, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(headers)
    
    for _ in range(num_rows):
        first_name = fake.first_name()
        last_name = fake.last_name()
        age = random.randint(18, 80)
        address_line1 = fake.street_address()
        city = fake.city()
        state = fake.state()
        gender = random.choice(genders)
        
        writer.writerow([
            first_name,
            last_name,
            age,
            address_line1,
            city,
            state,
            gender
        ])

print(f"CSV file '{output_file}' created with {num_rows} records.")
