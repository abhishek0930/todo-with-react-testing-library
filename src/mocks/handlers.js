import { rest } from 'msw';

export const handlers = [
  rest.get('https://randomuser.me/api', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: {
              title: "Mrs",
              first: "Chris",
              last: "Lemus"
            }
          }
        ],
      })
    );
  }),
];