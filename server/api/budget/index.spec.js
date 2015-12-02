'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var budgetCtrlStub = {
  index: 'budgetCtrl.index',
  show: 'budgetCtrl.show',
  create: 'budgetCtrl.create',
  update: 'budgetCtrl.update',
  destroy: 'budgetCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var budgetIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './budget.controller': budgetCtrlStub
});

describe('Budget API Router:', function() {

  it('should return an express router instance', function() {
    expect(budgetIndex).to.equal(routerStub);
  });

  describe('GET /api/budgets', function() {

    it('should route to budget.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'budgetCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/budgets/:id', function() {

    it('should route to budget.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'budgetCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/budgets', function() {

    it('should route to budget.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'budgetCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/budgets/:id', function() {

    it('should route to budget.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'budgetCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/budgets/:id', function() {

    it('should route to budget.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'budgetCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/budgets/:id', function() {

    it('should route to budget.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'budgetCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
