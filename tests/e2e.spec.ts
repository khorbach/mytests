import { test, expect } from '@playwright/test';

const baseUrl = 'https://jsonplaceholder.typicode.com';

// Test #1: Get All Comments for a Specific Post
test('Get All Comments for postId=2', async () => {

  // Step 1: Send GET request to retrieve comments for postId=2
  const response = await fetch(`${baseUrl}/comments?postId=2`);

  // Step 2: Verify that API response status code is 200 (OK)
  expect(response.status).toBe(200);

  // Step 3: Verify that the response contains only comments for postId=2
  const comments = await response.json();
  comments.forEach((comment: any) => {
    expect(comment.postId).toBe(2);
  });

  // Step 4: Verify that each comment has id, name, email, and body fields, and that they are not empty
  comments.forEach((comment: any) => {
    expect(comment).toHaveProperty('id');
    expect(comment.id).not.toBeNull();
    expect(comment).toHaveProperty('name');
    expect(comment.name).not.toBe('');
    expect(comment).toHaveProperty('email');
    expect(comment.email).not.toBe('');
    expect(comment).toHaveProperty('body');
    expect(comment.body).not.toBe('');
  });

  // Step 5: Verify fields' data types
  comments.forEach((comment: any) => {
    expect(typeof comment.id).toBe('number');
    expect(typeof comment.name).toBe('string');
    expect(typeof comment.email).toBe('string');
    expect(typeof comment.body).toBe('string');
  });
});


// Test #2: Create and Delete a Post
test('Create and Delete a Post', async () => {

  // Step 1: Send POST API request to /posts
  const postPayload = {
    title: "Post title",
    body: "Lorem ipsum dolor sit amet...",
    userId: 1,
  };

  const createResponse = await fetch(`${baseUrl}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postPayload),
  });

  // Step 2: Verify that the response status code is 201 (Created)
  expect(createResponse.status).toBe(201);

  // Step 3: Verify that response contains an id field
  const createResponseBody = await createResponse.json();
  const postId = createResponseBody.id;
  expect(postId).toBeDefined();

  // Step 4: Verify data type of id field
  expect(typeof postId).toBe('number');

  // Step 5: Send DELETE request to delete the created post
  const deleteResponse = await fetch(`${baseUrl}/posts/${postId}`, {
    method: 'DELETE',
  });

  // Step 6: Verify the response status code is 200
  expect(deleteResponse.status).toBe(200);

  // Step 7: Send GET request to verify that post is deleted
  const getDeletedPostResponse = await fetch(`${baseUrl}/posts/${postId}`);

  // Step 8: Verify the response status code is 404
  expect(getDeletedPostResponse.status).toBe(404); 
});

