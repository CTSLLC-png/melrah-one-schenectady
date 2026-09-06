migrate((app) => {
  const responses = new Collection({
    type: 'base',
    name: 'survey_responses',
    listRule: null,
    viewRule: null,
    createRule: '',
    updateRule: null,
    deleteRule: null,
    fields: [
      { name: 'role', type: 'select', required: true, maxSelect: 1, values: ['resident','stakeholder'] },
      { name: 'neighborhood', type: 'text', required: true, max: 120 },
      { name: 'priorities', type: 'json', required: true },
      { name: 'registered', type: 'text', max: 80 },
      { name: 'votedLocal', type: 'text', max: 80 },
      { name: 'association', type: 'text', max: 120 },
      { name: 'responsibilities', type: 'json' },
      { name: 'actions', type: 'json' },
      { name: 'source', type: 'text', max: 100 },
      { name: 'campaign', type: 'text', max: 100 },
      { name: 'respondentToken', type: 'text', max: 120 }
    ],
    indexes: [
      'CREATE INDEX idx_survey_neighborhood ON survey_responses (neighborhood)',
      'CREATE INDEX idx_survey_source ON survey_responses (source)',
      'CREATE INDEX idx_survey_campaign ON survey_responses (campaign)'
    ]
  })
  app.save(responses)

  const contacts = new Collection({
    type: 'base',
    name: 'contact_opt_ins',
    listRule: null,
    viewRule: null,
    createRule: '',
    updateRule: null,
    deleteRule: null,
    fields: [
      { name: 'response', type: 'relation', required: true, maxSelect: 1, collectionId: responses.id, cascadeDelete: true },
      { name: 'email', type: 'email', required: true },
      { name: 'consent', type: 'bool' }
    ],
    indexes: ['CREATE UNIQUE INDEX idx_contact_response ON contact_opt_ins (response)']
  })
  app.save(contacts)

  const accountability = new Collection({
    type: 'base',
    name: 'accountability_items',
    listRule: '',
    viewRule: '',
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { name: 'community', type: 'text', required: true, max: 120 },
      { name: 'neighborhood', type: 'text', max: 120 },
      { name: 'priority', type: 'text', required: true, max: 180 },
      { name: 'agency', type: 'text', max: 180 },
      { name: 'commitment', type: 'text', max: 500 },
      { name: 'funding', type: 'number', min: 0 },
      { name: 'status', type: 'select', maxSelect: 1, values: ['promised','funded','underway','completed','stalled'] },
      { name: 'sourceUrl', type: 'url' },
      { name: 'notes', type: 'text', max: 2000 }
    ]
  })
  app.save(accountability)
}, (app) => {
  for (const name of ['accountability_items','contact_opt_ins','survey_responses']) {
    try { app.delete(app.findCollectionByNameOrId(name)) } catch (_) {}
  }
})
