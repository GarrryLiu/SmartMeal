import { PlanRepository } from './repository/PlanRepository';
import { MockPlanRepository } from './repository/MockPlanRepository';
import { IPlanRepository } from './repository/types';

// Service locator to switch between mock and live repositories
class ServiceLocator {
  private _planRepository: IPlanRepository;

  constructor() {
    // Set to true to use mock data, false to use real API
    const useMock = true;
    this._planRepository = useMock ? new MockPlanRepository() : new PlanRepository();
  }

  get planRepository(): IPlanRepository {
    return this._planRepository;
  }

  // Method to switch repositories at runtime (for testing)
  setPlanRepository(repository: IPlanRepository) {
    this._planRepository = repository;
  }
}

export const serviceLocator = new ServiceLocator(); 