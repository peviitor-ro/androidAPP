import cities from '../../../assets/json/cities.json';

export const JOB_TYPE_ORDER = [20001, 20002, 20003];

export const FILTER_ITEMS = [
  { name: 'Orașe', id: 0, children: cities },
  {
    name: 'Tipuri de joburi',
    id: 20000,
    children: [
      { id: 20001, name: 'La fața locului', type: 'on-site' },
      { id: 20002, name: 'Hibrid', type: 'hybrid' },
      { id: 20003, name: 'Remote', type: 'remote' },
    ],
  },
];

export const CHILD_BY_ID = new Map(
  FILTER_ITEMS.flatMap((group) =>
    group.children.map((child) => [child.id, { ...child, groupId: group.id }]),
  ),
);
