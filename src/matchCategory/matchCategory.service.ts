import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchCategories } from './entities/matchCategories.entity';

@Injectable()
export class MatchCategoriesService {
    constructor(
        @InjectRepository(MatchCategories)
        private readonly matchCategoryRepository: Repository<MatchCategories>,
    ) { }

    // Fetch all categories
    async getAllCategories(): Promise<MatchCategories[]> {
        return await this.matchCategoryRepository.find();
    }

    // Fetch a category by ID
    async getCategoryById(id: number): Promise<MatchCategories> {
        const category = await this.matchCategoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Match Category with ID ${id} not found.`);
        }
        return category;
    }

    // Create a new category
    async createCategory(category_name: string): Promise<MatchCategories> {
        const category = this.matchCategoryRepository.create({ category_name });
        return await this.matchCategoryRepository.save(category);
    }

    // Update an existing category
    async updateCategory(id: number, category_name: string): Promise<MatchCategories> {
        const category = await this.getCategoryById(id);
        category.category_name = category_name;
        return await this.matchCategoryRepository.save(category);
    }

    // Delete a category
    async deleteCategory(id: number): Promise<void> {
        const result = await this.matchCategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Match Category with ID ${id} not found.`);
        }
    }
}
