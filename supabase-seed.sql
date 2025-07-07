-- Seed data for Columbia University dorms

-- Clear existing data to make this script idempotent
TRUNCATE TABLE reviews CASCADE;
TRUNCATE TABLE dorms CASCADE;

INSERT INTO dorms (id, name, description, location, image_url) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'John Jay Hall',
    'First-year residence hall located on the main campus. Known for its convenient location and close-knit community atmosphere.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/John%20Jay/JohnJayHall.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'Carman Hall',
    'Modern high-rise residence hall popular among first-year students. Features suite-style living with kitchenettes.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/Carman/CarmanHall.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'Wallach Hall',
    'Renovated residence hall offering modern amenities and spacious rooms. Located in the heart of campus.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/Wallach/WallachHall.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440004',
    'Hartley Hall',
    'Historic residence hall with traditional college charm. Features single and double rooms with shared bathrooms.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/Hartley/HartleyHall.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    'McBain Hall',
    'Apartment-style living for upperclass students. Each unit has a kitchen, living room, and multiple bedrooms.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/McBain/562W113.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440006',
    'EC (East Campus)',
    'Large apartment-style residence hall popular with upperclass students. Features full kitchens and living areas.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/East%20Campus/EastCampus.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440007',
    'Wien Hall',
    'Modern residence hall with air conditioning. Popular choice for students seeking contemporary amenities.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/Wien/WienHall.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440008',
    'Schapiro Hall',
    'Apartment-style housing with modern amenities. Features full kitchens and spacious common areas.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/Schapiro/Schapiro%20Exterior_Updated%202025.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440009',
    'Broadway Hall',
    'Apartment-style residence featuring modern amenities and great city views. Popular among upperclass students.',
    'Morningside Heights Campus',
    'https://www.housing.columbia.edu/sites/default/files/content/img/Buildings/Hogan/Hogan%20Exterior_Updated%202025.jpg'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440010',
    'Cathedral Gardens',
    'Off-campus apartment complex managed by Columbia. Features modern amenities and easy campus access.',
    'Near Morningside Heights',
    'https://live.staticflickr.com/1753/28948893538_0fa4064590_o.jpg'
  );

-- Sample reviews for John Jay Hall
INSERT INTO reviews (dorm_id, user_id, rating, title, content, tags) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'sample_user_1',
    4,
    'Great location and community',
    'John Jay is perfect for first-years. The location is unbeatable - you''re right in the heart of campus. The community atmosphere is amazing, and I made lifelong friends here. Rooms are a bit small but that''s expected for NYC.',
    ARRAY['location', 'community', 'first-year friendly']
  ),
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'sample_user_2',
    3,
    'Good but can be noisy',
    'John Jay has its pros and cons. Love the central location and the dining hall downstairs is convenient. However, it can get quite noisy, especially on weekends. The rooms are small but manageable.',
    ARRAY['location', 'noisy', 'dining']
  );

-- Sample reviews for Carman Hall
INSERT INTO reviews (dorm_id, user_id, rating, title, content, tags) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'sample_user_3',
    5,
    'Modern and spacious',
    'Carman is amazing! The suite-style living is perfect, and having a kitchenette is so convenient. The building is modern and well-maintained. Definitely recommend for first-years who want more space.',
    ARRAY['modern', 'spacious', 'kitchenette', 'suite-style']
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'sample_user_4',
    4,
    'Great amenities',
    'Really enjoyed living in Carman. The amenities are top-notch and the rooms are much larger than other first-year dorms. The only downside is it''s a bit further from some academic buildings.',
    ARRAY['amenities', 'spacious', 'location']
  );

-- Sample reviews for other dorms
INSERT INTO reviews (dorm_id, user_id, rating, title, content, tags) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'sample_user_5',
    4,
    'Newly renovated and clean',
    'Wallach is beautifully renovated with modern amenities. The rooms are a good size and everything feels fresh and clean. Great choice for anyone looking for updated facilities.',
    ARRAY['renovated', 'modern', 'clean']
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    'sample_user_6',
    5,
    'Best upperclass option',
    'McBain is fantastic for upperclass students. Having a full apartment with kitchen and living room makes such a difference. Great for students who want independence while staying on campus.',
    ARRAY['apartment-style', 'kitchen', 'upperclass', 'independent']
  ),
  (
    '550e8400-e29b-41d4-a716-446655440006',
    'sample_user_7',
    4,
    'Spacious apartments',
    'EC offers great apartment-style living. The apartments are spacious and having a full kitchen is amazing. Can get a bit loud due to the party scene, but overall a great experience.',
    ARRAY['apartment-style', 'spacious', 'kitchen', 'social']
  );
