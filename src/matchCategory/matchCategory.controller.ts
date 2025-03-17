import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MatchCategoriesService } from './matchCategory.service';
import { MatchCategories } from './entities/matchCategories.entity';

@Controller('api/match-categories')
export class MatchCategoriesController {
    constructor(private readonly matchCategoriesService: MatchCategoriesService) { }

    // Get all categories
    @Get()
    async getAllCategories(): Promise<MatchCategories[]> {
        return await this.matchCategoriesService.getAllCategories();
    }

    // Get category by ID
    @Get(':id')
    async getCategoryById(@Param('id') id: number): Promise<MatchCategories> {
        return await this.matchCategoriesService.getCategoryById(id);
    }

    // Add a new category
    @Post()
    async createCategory(@Body('category_name') category_name: string): Promise<MatchCategories> {
        return await this.matchCategoriesService.createCategory(category_name);
    }

    // Update a category
    @Put(':id')
    async updateCategory(@Param('id') id: number, @Body('category_name') category_name: string): Promise<MatchCategories> {
        return await this.matchCategoriesService.updateCategory(id, category_name);
    }

    // Delete a category
    @Delete(':id')
    async deleteCategory(@Param('id') id: number): Promise<void> {
        await this.matchCategoriesService.deleteCategory(id);
    }
}
