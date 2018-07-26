SELECT * FROM fanfics WHERE LOWER(CONCAT(title, ' ', author, ' ', synopsis)) LIKE LOWER(CONCAT('%', $1, '%'))
--where $1 is the search term

/*
SELECT * FROM fanfics WHERE LOWER(CONCAT(title, ' ', author, ' ', synopsis)) LIKE LOWER(CONCAT('%', 'Canon', '%'));
*/