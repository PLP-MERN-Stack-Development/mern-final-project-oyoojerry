const request = require('supertest');
const app = require('../index'); // modify to export app

describe('Tasks API', ()=>{
  it('should return all tasks', async ()=>{
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
