UPDATE favorites
    SET story_read = NOT story_read
    WHERE fanfic_id = $1 AND user_id = $2

/*
UPDATE favorites
    SET story_read = NOT story_read
    WHERE fanfic_key = 1 AND user_key = 1;
*/