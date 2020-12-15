const posts = [
  {
    _id: '5f0334f8ea551e2064dc1552',
    comments: [],
    title: 'Rio de Janeiro',
    image:
      '/uploads/2020-07-06T14:28:08.828Zrio-de-janeiro-brazil-1000-667.jpg',
    caption: 'Cidade Maravilhosa',
    date: {
      $date: '2020-07-06T14:28:08.903Z',
    },
    user: {
      $oid: '5f01e80ad04de70efc7ff5c4',
    },
    __v: 12,
    likes: [],
  },
  {
    _id: '5f416f906568163d4d21970d',
    comments: [],
    title: 'BH - Belo Horizonte',
    image: '/uploads/2020-08-22T19:18:40.915Zbh-pampulha.jpg',
    caption: 'My hometown is beautiful.',
    date: {
      $date: '2020-08-22T19:18:40.931Z',
    },
    user: {
      $oid: '5f01e80ad04de70efc7ff5c4',
    },
    __v: 0,
  },
  {
    _id: '5f4170156568163d4d21970e',
    comments: [],
    title: 'Cape Town',
    image: '/uploads/2020-08-22T19:20:53.545Zcape-town-aerial-view.jpg',
    caption: 'The Perfect Vacation in Cape Town',
    date: {
      $date: '2020-08-22T19:20:53.563Z',
    },
    user: {
      $oid: '5f01e80ad04de70efc7ff5c4',
    },
    __v: 1,
    likes: [
      {
        $oid: '5eaf07b75abd260c72e08813',
      },
    ],
  },
  {
    _id: '5f41707a6568163d4d21970f',
    comments: [],
    title: 'Abu Dhabi Skyline',
    image: '/uploads/2020-08-22T19:22:34.149ZAbu Dhabi Skyline.jpg',
    caption: "Abu Dhabi's modern sky scrappers",
    date: {
      $date: '2020-08-22T19:22:34.152Z',
    },
    user: {
      $oid: '5f01e80ad04de70efc7ff5c4',
    },
    __v: 2,
    likes: [],
  },
  {
    _id: '5f41ac614cc1dd45020d9fec',
    comments: [],
    title: 'Rutherford NJ',
    image: '/uploads/2020-08-22T23:38:09.666ZRutherford,_New_Jersey_(2010).jpg',
    caption: 'Beautiful town in NJ',
    date: {
      $date: '2020-08-22T23:38:09.675Z',
    },
    user: {
      $oid: '5f01eb17bad52d112dfb5456',
    },
    __v: 13,
    likes: [
      {
        $oid: '5eaf07b75abd260c72e08813',
      },
    ],
  },
  {
    _id: '5f582661c0d2d3dc01d40c73',
    comments: [],
    likes: [
      {
        $oid: '5f01e80ad04de70efc7ff5c4',
      },
    ],
    title: 'Honolulu',
    image:
      '/uploads/2020-09-09T00:48:33.621ZHonolulu-Waikiki-ThinkstockPhotos-498284930-RSZ-768x512.v1-750x450.jpg',
    caption: 'Unforgettable place!!',
    date: {
      $date: '2020-09-09T00:48:33.631Z',
    },
    user: {
      $oid: '5eaf07b75abd260c72e08813',
    },
    __v: 11,
  },
];

module.exports = { posts };
