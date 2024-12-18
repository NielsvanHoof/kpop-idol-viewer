<?php

namespace App\Filament\Resources;

    use App\Filament\Resources\ArticleResource\Pages;
    use App\Models\Article;
    use Filament\Forms\Components\DatePicker;
    use Filament\Forms\Components\Placeholder;
    use Filament\Forms\Components\TextInput;
    use Filament\Forms\Form;
    use Filament\Resources\Resource;
    use Filament\Tables\Actions\BulkActionGroup;
    use Filament\Tables\Actions\DeleteAction;
    use Filament\Tables\Actions\DeleteBulkAction;
    use Filament\Tables\Actions\EditAction;
    use Filament\Tables\Columns\TextColumn;
    use Filament\Tables\Table;

    class ArticleResource extends Resource {
        protected static ?string $model = Article::class;

        protected static ?string $slug = 'articles';

        protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

        PUBLIC static function form(Form $form): Form
        {
        return $form
        ->schema([//
        TextInput::make('title')
        ->required(),

        TextInput::make('description')
        ->required(),

        DatePicker::make('date'),

        TextInput::make('type')
        ->required(),

        Placeholder::make('created_at')
        ->label('Created Date')
        ->content(fn (?Article $record): string => $record?->created_at?->diffForHumans() ?? '-'),

        Placeholder::make('updated_at')
        ->label('Last Modified Date')
        ->content(fn (?Article $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
        ]);
        }

        PUBLIC static function table(Table $table): Table
        {
        return $table
        ->columns([
        TextColumn::make('title')
        ->searchable()
        ->sortable(),

        TextColumn::make('description'),

        TextColumn::make('date')
        ->date(),

        TextColumn::make('type'),
        ])
        ->filters([
        //
        ])
        ->actions([
        EditAction::make(),
        DeleteAction::make(),
        ])
        ->bulkActions([
        BulkActionGroup::make([
        DeleteBulkAction::make(),
        ]),
        ]);
        }

        public static function getPages(): array
        {
        return [
        'index' => Pages\ListArticles::route('/'),
'create' => Pages\CreateArticle::route('/create'),
'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
        }

        PUBLIC static function getGloballySearchableAttributes(): array
        {
        return ['title'];
        }
    }
