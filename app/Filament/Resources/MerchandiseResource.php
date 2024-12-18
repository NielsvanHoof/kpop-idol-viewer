<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MerchandiseResource\Pages;
use App\Models\Group;
use App\Models\Idol;
use App\Models\Merchandise;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MerchandiseResource extends Resource
{
    protected static ?string $model = Merchandise::class;

    protected static ?string $slug = 'merchandises';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Basic Details')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        TextInput::make('name')
                            ->label('Merchandise Name')
                            ->required()
                            ->placeholder('Enter merchandise name'),

                        Textarea::make('description')
                            ->label('Description')
                            ->rows(3)
                            ->placeholder('Briefly describe the merchandise'),

                        TextInput::make('price')
                            ->label('Price (USD)')
                            ->numeric()
                            ->prefix('$')
                            ->placeholder('Enter price')
                            ->required(),

                        Checkbox::make('available')
                            ->label('Available for Purchase'),
                    ])
                    ->collapsible(),

                Section::make('Associations')
                    ->icon('heroicon-o-link')
                    ->schema([
                        MorphToSelect::make('merchandiseable')
                            ->types([
                                MorphToSelect\Type::make(Idol::class)
                                    ->titleAttribute('name')
                                    ->label('Idol'),
                                MorphToSelect\Type::make(Group::class)
                                    ->titleAttribute('name')
                                    ->label('Group'),
                            ])
                            ->label('Associated Entity')
                            ->searchable()
                            ->preload()
                            ->required(),
                    ])
                    ->collapsible(),

                Section::make('Release & Metadata')
                    ->icon('heroicon-o-calendar')
                    ->schema([
                        DatePicker::make('release_date')
                            ->label('Release Date')
                            ->placeholder('Select release date'),

                        Placeholder::make('created_at')
                            ->label('Created Date')
                            ->content(fn (?Merchandise $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                        Placeholder::make('updated_at')
                            ->label('Last Modified Date')
                            ->content(fn (?Merchandise $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('description'),

                TextColumn::make('price'),

                TextColumn::make('available'),

                TextColumn::make('release_date')
                    ->date(),

                TextColumn::make('merchandiseable_id'),

                TextColumn::make('merchandiseable_type'),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMerchandises::route('/'),
            'create' => Pages\CreateMerchandise::route('/create'),
            'edit' => Pages\EditMerchandise::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name'];
    }
}
