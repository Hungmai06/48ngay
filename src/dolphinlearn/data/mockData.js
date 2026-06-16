export const documentCategories = [
  { id: 1, name: 'Công nghệ', icon: 'devices' },
  { id: 2, name: 'Kinh doanh', icon: 'trending_up' },
  { id: 3, name: 'Khoa học', icon: 'science' },
  { id: 4, name: 'Văn học', icon: 'auto_stories' },
  { id: 5, name: 'Du lịch', icon: 'travel_explore' },
  { id: 6, name: 'Ẩm thực', icon: 'restaurant' },
]

export const documents = [
  { id: 1, title: 'IELTS Writing Task 2', description: 'Tổng hợp bài mẫu và từ vựng band 7.0+', categoryId: 2, views: 3702, thumbnail: null },
  { id: 2, title: 'TOEIC Listening Part 3-4', description: 'Chiến lược nghe hiểu và bài tập thực hành', categoryId: 1, views: 2676, thumbnail: null },
  { id: 3, title: 'Ngữ pháp Tiếng Anh A-Z', description: 'Tài liệu ngữ pháp toàn diện cho mọi cấp độ', categoryId: 3, views: 6468, thumbnail: null },
  { id: 4, title: 'Business English Emails', description: 'Mẫu email thương mại chuyên nghiệp', categoryId: 2, views: 2235, thumbnail: null },
  { id: 5, title: '1000 từ vựng IELTS', description: 'Từ vựng academic theo chủ đề', categoryId: 4, views: 9600, thumbnail: null },
  { id: 6, title: 'Phát âm chuẩn IPA', description: 'Hướng dẫn phát âm chuẩn quốc tế', categoryId: 5, views: 4701, thumbnail: null },
]

export const vocabularyCollections = [
  { id: 1, title: 'IELTS 500 từ cần biết', description: 'Từ vựng academic thiết yếu cho IELTS 6.5+', icon: 'school', wordCount: 53, progress: 72, color: 'primary' },
  { id: 2, title: 'TOEIC 800 từ', description: 'Từ vựng chuyên ngành kinh doanh và giao tiếp', icon: 'business_center', wordCount: 55, progress: 45, color: 'accent' },
  { id: 3, title: 'Giao tiếp hàng ngày', description: 'Cụm từ thông dụng trong cuộc sống', icon: 'chat_bubble', wordCount: 22, progress: 88, color: 'success' },
  { id: 4, title: 'Tiếng Anh công sở', description: 'Từ vựng và mẫu câu cho dân văn phòng', icon: 'work', wordCount: 33, progress: 30, color: 'primary' },
  { id: 5, title: 'Du lịch & Khám phá', description: 'Giao tiếp tại sân bay, khách sạn, nhà hàng', icon: 'travel_explore', wordCount: 30, progress: 55, color: 'accent' },
  { id: 6, title: 'Công nghệ thông tin', description: 'Thuật ngữ IT và lập trình', icon: 'code', wordCount: 42, progress: 15, color: 'primary' },
]

export const vocabularySubCollections = [
  // Under Category 1 (IELTS)
  { id: 101, collectionId: 1, title: 'IELTS Topic 1: Education (Giáo dục)', description: 'Từ vựng chủ đề giáo dục và phương pháp học', wordCount: 4, progress: 90 },
  { id: 102, collectionId: 1, title: 'IELTS Topic 2: Environment (Môi trường)', description: 'Các thuật ngữ môi trường và biến đổi khí hậu', wordCount: 4, progress: 60 },
  { id: 103, collectionId: 1, title: 'IELTS Topic 3: Technology (Công nghệ)', description: 'Phát triển công nghệ và đời sống số', wordCount: 2, progress: 40 },
  
  // Under Category 2 (TOEIC)
  { id: 201, collectionId: 2, title: 'TOEIC Topic 1: Office (Văn phòng)', description: 'Giao tiếp văn phòng và công việc hàng ngày', wordCount: 2, progress: 70 },
  { id: 202, collectionId: 2, title: 'TOEIC Topic 2: Marketing & Sales', description: 'Thuật ngữ tiếp thị, bán hàng và quảng cáo', wordCount: 2, progress: 30 },
  
  // Under Category 3 (Giao tiếp)
  { id: 301, collectionId: 3, title: 'Giao tiếp Topic 1: Greetings (Chào hỏi)', description: 'Mẫu câu xã giao chào hỏi ban đầu', wordCount: 2, progress: 100 },
  { id: 302, collectionId: 3, title: 'Giao tiếp Topic 2: Food & Drinks', description: 'Gọi món tại nhà hàng và nói chuyện ăn uống', wordCount: 2, progress: 75 },

  // Under Category 4 (Công sở)
  { id: 401, collectionId: 4, title: 'Công sở Topic 1: Meetings (Hội họp)', description: 'Mẫu câu điều hành và tham gia cuộc họp', wordCount: 2, progress: 50 },
  { id: 402, collectionId: 4, title: 'Công sở Topic 2: Presentations', description: 'Kỹ năng thuyết trình bằng tiếng Anh công sở', wordCount: 2, progress: 10 },

  // Under Category 5 (Du lịch)
  { id: 501, collectionId: 5, title: 'Du lịch Topic 1: At the Airport (Sân bay)', description: 'Thủ tục check-in, ký gửi hành lý, lên máy bay', wordCount: 2, progress: 80 },
  { id: 502, collectionId: 5, title: 'Du lịch Topic 2: Booking a Hotel', description: 'Đặt phòng, trả phòng và yêu cầu dịch vụ khách sạn', wordCount: 2, progress: 30 },

  // Under Category 6 (CNTT)
  { id: 601, collectionId: 6, title: 'CNTT Topic 1: Hardware (Phần cứng)', description: 'Các bộ phận máy tính và thiết bị ngoại vi', wordCount: 2, progress: 25 },
  { id: 602, collectionId: 6, title: 'CNTT Topic 2: Software Development', description: 'Thuật ngữ quy trình lập trình và phát triển phần mềm', wordCount: 2, progress: 5 }
]

export const vocabularyWords = [
  // SubCollection 101: Education (Giáo dục)
  { id: 1, subCollectionId: 101, word: 'Curriculum', meaning: 'Chương trình học', pronunciation: '/kəˈrɪkjələm/' },
  { id: 2, subCollectionId: 101, word: 'Pedagogy', meaning: 'Phương pháp sư phạm', pronunciation: '/ˈpedəɡɒdʒi/' },
  { id: 3, subCollectionId: 101, word: 'Academic', meaning: 'Thuộc học thuật', pronunciation: '/ˌækəˈdemɪk/' },
  { id: 4, subCollectionId: 101, word: 'Enrollment', meaning: 'Sự tuyển sinh, nhập học', pronunciation: '/ɪnˈrəʊlmənt/' },

  // SubCollection 102: Environment (Môi trường)
  { id: 5, subCollectionId: 102, word: 'Biodiversity', meaning: 'Đa dạng sinh học', pronunciation: '/ˌbaɪəʊdaɪˈvɜːsəti/' },
  { id: 6, subCollectionId: 102, word: 'Conservation', meaning: 'Sự bảo tồn', pronunciation: '/ˌkɒnsəˈveɪʃn/' },
  { id: 7, subCollectionId: 102, word: 'Contaminate', meaning: 'Làm ô nhiễm', pronunciation: '/kənˈtæmɪneɪt/' },
  { id: 8, subCollectionId: 102, word: 'Sustainable', meaning: 'Bền vững', pronunciation: '/səˈsteɪnəbl/' },

  // SubCollection 103: Technology (Công nghệ)
  { id: 9, subCollectionId: 103, word: 'Innovation', meaning: 'Sự đổi mới, sáng kiến', pronunciation: '/ˌɪnəˈveɪʃn/' },
  { id: 10, subCollectionId: 103, word: 'Automation', meaning: 'Sự tự động hóa', pronunciation: '/ˌɔːtəˈmeɪʃn/' },

  // SubCollection 201: Office (Văn phòng)
  { id: 11, subCollectionId: 201, word: 'Colleague', meaning: 'Đồng nghiệp', pronunciation: '/ˈkɒliːɡ/' },
  { id: 12, subCollectionId: 201, word: 'Correspondence', meaning: 'Thư từ trao đổi', pronunciation: '/ˌkɒrəˈspɒndəns/' },

  // SubCollection 202: Marketing & Sales
  { id: 13, subCollectionId: 202, word: 'Campaign', meaning: 'Chiến dịch', pronunciation: '/kæmˈpeɪn/' },
  { id: 14, subCollectionId: 202, word: 'Demographics', meaning: 'Nhân khẩu học', pronunciation: '/ˌdeməˈɡræfɪks/' },

  // SubCollection 301: Greetings
  { id: 15, subCollectionId: 301, word: 'Pleasure', meaning: 'Niềm hân hạnh', pronunciation: '/ˈpleʒə(r)/' },
  { id: 16, subCollectionId: 301, word: 'Acquaintance', meaning: 'Người quen', pronunciation: '/əˈkweɪntəns/' },

  // SubCollection 302: Food & Drinks
  { id: 17, subCollectionId: 302, word: 'Appetizer', meaning: 'Món khai vị', pronunciation: '/ˈæpɪtaɪzə(r)/' },
  { id: 18, subCollectionId: 302, word: 'Beverage', meaning: 'Đồ uống', pronunciation: '/ˈbevərɪdʒ/' },

  // SubCollection 401: Meetings
  { id: 19, subCollectionId: 401, word: 'Agenda', meaning: 'Chương trình nghị sự', pronunciation: '/əˈdʒendə/' },
  { id: 20, subCollectionId: 401, word: 'Adjourn', meaning: 'Hoãn lại, kết thúc cuộc họp', pronunciation: '/əˈdʒɜːn/' },

  // SubCollection 402: Presentations
  { id: 21, subCollectionId: 402, word: 'Slideshow', meaning: 'Bài trình chiếu', pronunciation: '/ˈslaɪdʃəʊ/' },
  { id: 22, subCollectionId: 402, word: 'Visual aids', meaning: 'Trực quan hỗ trợ', pronunciation: '/ˈvɪʒuəl eɪdz/' },

  // SubCollection 501: Airport
  { id: 23, subCollectionId: 501, word: 'Boarding pass', meaning: 'Thẻ lên máy bay', pronunciation: '/ˈbɔːdɪŋ pɑːs/' },
  { id: 24, subCollectionId: 501, word: 'Baggage claim', meaning: 'Nơi nhận hành lý', pronunciation: '/ˈbæɡɪdʒ kleɪm/' },

  // SubCollection 502: Hotel
  { id: 25, subCollectionId: 502, word: 'Reservation', meaning: 'Sự đặt phòng trước', pronunciation: '/ˌrezəˈveɪʃn/' },
  { id: 26, subCollectionId: 502, word: 'Complimentary', meaning: 'Miễn phí, đi kèm', pronunciation: '/ˌkɒmplɪˈmentri/' },

  // SubCollection 601: Hardware
  { id: 27, subCollectionId: 601, word: 'Processor', meaning: 'Bộ vi xử lý', pronunciation: '/ˈprəʊsesə(r)/' },
  { id: 28, subCollectionId: 601, word: 'Peripheral', meaning: 'Thiết bị ngoại vi', pronunciation: '/pəˈrɪfərəl/' },

  // SubCollection 602: Software
  { id: 29, subCollectionId: 602, word: 'Repository', meaning: 'Kho chứa mã nguồn', pronunciation: '/rɪˈpɒzətri/' },
  { id: 30, subCollectionId: 602, word: 'Compiler', meaning: 'Trình biên dịch', pronunciation: '/kəmˈpaɪlə(r)/' },
]

export const leaderboard = [
  { rank: 1, name: 'Minh Anh', score: 2450, streak: 15, badge: 'Nhà vô địch' },
  { rank: 2, name: 'Hài Đăng', score: 2180, streak: 8, badge: 'Siêu sao' },
  { rank: 3, name: 'Thu Hà', score: 1950, streak: 12, badge: 'Chăm chỉ' },
  { rank: 4, name: 'Alex Explorer', score: 1820, streak: 5, badge: 'Khám phá' },
  { rank: 5, name: 'Phương Linh', score: 1650, streak: 3, badge: 'Mới bắt đầu' },
]
