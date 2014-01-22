test("containsChar", function() {
    deepEqual(containsChar("mouse","u"),true,"The letter u should be in the word mouse");
    deepEqual(containsChar("mouse","z"),false,"The letter z should not be in the word mouse");
});
